# C++ Learning Framework

A structured guide combining study notes and quick reference for embedded systems C++.

---

## C++ Object Model & Memory

### Key Concepts
- **Object layout**: How objects are laid out in memory (vtable, member variables, padding)
- **Memory regions**: Stack, heap, static/global, code segments
- **Pointer arithmetic**: How pointers work with object types
- **Virtual functions**: vtable mechanism and dynamic dispatch overhead
- **Memory alignment**: How alignment affects object size and access patterns

#### Object Layouts:
- Primarily determined by the compiler, and not CPP itself
- Fundamental Principles:
  - Non static data members: memery is allocated in order of their decleration within the same access specific block. Different blocks are public, private, protected. The compiler can reorder these
  - Padding and Alignement: Compiler inserts padding (which is unused bytes) between data memebers or at the end of the object to ensure proper memory alignment for efficient use across the CPU
    - This is why sizeof() may return a larger value than the sum of the member sizes
  - What is memory alignment?:
    - Some data types must start at memory addresses that are multiples of a certain number.
  - How does memory actually work?
    - The CPU reads *chunks* of memory the size of the data bus~
      - For example, an 8 bit MCU reads one byte at a time (remembering there are 8 bits in a byte)
      - a 32 bit MCU like the ESP32 reads 32 bits (4bytes) at a time
    - So bringing pointers into this, when a CPU exectues uint32_t x = *p;, it tries to fetch one, 32 bit unit from memory
    - This is where memory alignment comes in. You need the thing you are trying to retrieve to fit nicely into one unit. Otherwise, if it's split across two, you'll either crash, or the CPU wil need to:
      - Load both chunks
      - Shift and recombine them
      - return the result
    - These operations cost cycles, more complex logic, and it might just crash
    - DMA, Diremt Memory Access has this same problem but even worse. They often can't do misaligned transfers at all. Shit will definitely be corrupted or crash
  - Static members: static members are stored seperately from inidicdual objects, and are shared by all instances of the class. They do not affect the size or layout of the object instance itself.
  - Member Functions: non-virtual member

#### Rules of Thumb for memory layouts:
- Order struct members from largest to smallest
  - This packs thins as tightly as possible in memory, minimizes padding
- Never assume packed structs are safe
- never cast random byte buffers to structs
- Align DMA, SPI, SD framebuffers explicitly
- Misaligned memory will crash!


#### Questions:
- what does proper memory alignment mean? What is an example of bad padding?



---

## Constructors / Destructors / RAII

### Key Concepts
- **RAII**: Resource Acquisition Is Initialization - tie resource lifetime to object lifetime
- **Constructor types**: default, copy, move, delegating
- **Destructor**: cleanup when object goes out of scope
- **Exception safety**: strong guarantee, basic guarantee, no-throw guarantee
- **Rule of 3/5/0**: copy/move semantics

### Study Notes
- Constructor: initializes object, can throw (object not fully constructed yet)
- Destructor: cleanup, should be noexcept (called during stack unwinding)
- RAII: acquire in constructor, release in destructor
- Move semantics: transfer ownership, leave source in valid but unspecified state

### Reference
- Default constructor: `ClassName() = default;` or `ClassName() {}`
- Copy constructor: `ClassName(const ClassName&)`
- Move constructor: `ClassName(ClassName&&) noexcept`
- Destructor: `~ClassName() noexcept`
- Rule of 5: if you define one of copy/move/dtor, consider all five

### Common Patterns
```cpp
// RAII wrapper for resource
class FileHandle {
    FILE* file;
public:
    explicit FileHandle(const char* path) : file(fopen(path, "r")) {
        if (!file) throw std::runtime_error("Failed to open file");
    }
    
    ~FileHandle() noexcept {
        if (file) fclose(file);
    }
    
    // Delete copy, allow move
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;
    
    FileHandle(FileHandle&& other) noexcept : file(other.file) {
        other.file = nullptr;
    }
    
    FILE* get() const { return file; }
};
```

### Gotchas
- Destructor must not throw (undefined behavior)
- Virtual destructor needed for base classes
- Member initialization order follows declaration order, not initializer list order
- `= default` vs `{}` - `= default` can be trivial, `{}` is user-defined

---

## Classes as Drivers

### Key Concepts
- **Encapsulation**: Hide hardware details behind class interface
- **State management**: Track hardware state, prevent invalid operations
- **Error handling**: Return codes vs exceptions for embedded
- **Initialization**: Constructor vs explicit init() method
- **Hardware abstraction**: Template parameters for pins/peripherals

### Study Notes
- Driver class wraps hardware register access
- Constructor: initialize hardware, set pins, configure peripherals
- Methods: read/write operations, state queries
- Consider: blocking vs non-blocking, interrupt-driven vs polling
- Template parameters: compile-time pin/peripheral selection

### Reference
- Common pattern: `class Driver { init(), read(), write(), deinit() }`
- State machine: track current state (idle, busy, error)
- Error codes: `enum class Error { Ok, Timeout, Busy, Invalid }`
- Hardware registers: use `volatile` for memory-mapped I/O

### Common Patterns
```cpp
// Basic driver pattern
class SPI {
    volatile SPI_Registers* regs;
    bool initialized;
public:
    SPI(volatile SPI_Registers* r) : regs(r), initialized(false) {}
    
    Error init() {
        if (initialized) return Error::AlreadyInit;
        // Configure registers
        initialized = true;
        return Error::Ok;
    }
    
    Error transfer(const uint8_t* tx, uint8_t* rx, size_t len) {
        if (!initialized) return Error::NotInit;
        // Perform transfer
        return Error::Ok;
    }
    
    ~SPI() {
        if (initialized) deinit();
    }
};
```

### Gotchas
- Hardware state can change outside your control (interrupts)
- Use `volatile` for hardware registers
- Consider reentrancy and thread safety
- Initialization order matters (dependencies between drivers)

---

## const, constexpr, static

### Key Concepts
- **const**: Immutable value, cannot modify after initialization
- **constexpr**: Evaluated at compile-time, can be used in constant expressions
- **static**: Internal linkage (file scope) or class member (shared across instances)
- **const member functions**: Promise not to modify object state
- **const correctness**: Mark everything const that can be

### Study Notes
- `const` variable: value cannot change
- `const` member function: `void func() const` - cannot modify non-mutable members
- `constexpr` function: can be evaluated at compile-time if arguments are constant
- `static` member: one instance shared by all objects of class
- `static` local: persists across function calls, initialized once

### Reference
- `const T*` or `T const*`: pointer to const (value can't change)
- `T* const`: const pointer (pointer can't change)
- `const T* const`: const pointer to const
- `constexpr` variables must be initialized with constant expression
- `static` class members: declare in class, define outside (one definition rule)

### Common Patterns
```cpp
class Config {
    static constexpr int MAX_BUFFER_SIZE = 256;  // Compile-time constant
    static int instance_count;                    // Shared across all instances
    
    const int id;                                 // Immutable per instance
    
public:
    Config(int i) : id(i) { instance_count++; }
    
    int get_id() const { return id; }            // const member function
    
    static int get_count() { return instance_count; }
};

int Config::instance_count = 0;  // Definition of static member

// constexpr function
constexpr int square(int x) {
    return x * x;
}

constexpr int val = square(5);  // Evaluated at compile-time
```

### Gotchas
- `const` member functions can modify `mutable` members
- `constexpr` functions can be called at runtime too
- `static` member variables need definition outside class (except constexpr)
- `const` pointer vs pointer to const - different meanings

---

## Build Systems & Linker Model

### Key Concepts
- **Compilation**: Source → Object files (.o/.obj)
- **Linking**: Object files → Executable/library
- **Translation units**: One source file + included headers
- **One Definition Rule (ODR)**: Definitions must appear exactly once
- **Linkage**: External (visible to linker) vs Internal (not visible)

### Study Notes
- Compiler: processes each .cpp file independently
- Linker: resolves symbols between object files
- Header guards: prevent multiple inclusion (`#ifndef` or `#pragma once`)
- Templates: instantiated when used, must be in headers (usually)
- Static linking: code copied into executable
- Dynamic linking: code loaded at runtime (.so/.dll)

### Reference
- **Declaration**: `extern int x;` - tells compiler symbol exists
- **Definition**: `int x = 5;` - actually creates the symbol
- **Inline**: `inline` functions can be defined in headers (ODR exception)
- **Static**: `static` functions/variables have internal linkage
- **Extern "C"**: C linkage (no name mangling)

### Common Patterns
```cpp
// header.h
#ifndef HEADER_H
#define HEADER_H

// Declaration
extern int global_var;

// Inline definition (can be in header)
inline int add(int a, int b) {
    return a + b;
}

// Template (must be in header)
template<typename T>
T multiply(T a, T b) {
    return a * b;
}

#endif

// source.cpp
#include "header.h"

// Definition
int global_var = 42;

// Static (internal linkage, not visible to linker)
static int local_var = 10;
```

### Build System Basics
- **Make**: `make` - traditional, uses Makefile
- **CMake**: `cmake` + `make` - cross-platform, generates Makefiles
- **Compile flags**: `-O2` (optimize), `-g` (debug), `-Wall` (warnings)
- **Link flags**: `-l` (link library), `-L` (library path)

### Gotchas
- Multiple definitions cause linker errors
- Missing definitions cause undefined reference errors
- Templates must be visible at point of use (header-only or explicit instantiation)
- Static initialization order fiasco: order of global constructors undefined

---

## Templates for Pins & Peripherals

### Key Concepts
- **Template parameters**: Compile-time configuration
- **Type safety**: Catch errors at compile-time, not runtime
- **Zero-cost abstraction**: No runtime overhead for template metaprogramming
- **CRTP**: Curiously Recurring Template Pattern for static polymorphism
- **SFINAE**: Substitution Failure Is Not An Error

### Study Notes
- Templates: generate code at compile-time based on types/values
- Pin templates: `GPIO<Pin5>` vs runtime `GPIO(5)` - type-safe, no runtime cost
- Peripheral templates: `SPI<SPI1>` - different instances are different types
- Template specialization: Custom behavior for specific types
- `constexpr` + templates: Compile-time computation

### Reference
- Template syntax: `template<typename T>` or `template<int N>`
- Class template: `template<typename T> class Container { ... }`
- Function template: `template<typename T> T func(T x) { ... }`
- Template specialization: `template<> class Container<int> { ... }`
- `typename` vs `class` in templates: Same for type parameters

### Common Patterns
```cpp
// Pin as template parameter
template<int PinNumber>
class GPIO {
public:
    static void set_high() {
        // Compile-time pin number, no runtime overhead
        *port_reg |= (1 << PinNumber);
    }
    
    static void set_low() {
        *port_reg &= ~(1 << PinNumber);
    }
};

// Usage
using LED = GPIO<13>;
LED::set_high();

// Peripheral template
template<typename Peripheral>
class Driver {
    Peripheral& periph;
public:
    Driver(Peripheral& p) : periph(p) {}
    
    void init() {
        periph.enable();
    }
};

// CRTP for static polymorphism
template<typename Derived>
class Base {
public:
    void interface() {
        static_cast<Derived*>(this)->implementation();
    }
};

class Derived : public Base<Derived> {
    void implementation() { /* ... */ }
};
```

### Gotchas
- Template code must be visible at instantiation point (usually in headers)
- Template errors can be cryptic (long error messages)
- Code bloat: each template instantiation creates separate code
- Can't separate declaration/definition across files easily

---

## Placement new + No-Heap Designs

### Key Concepts
- **Placement new**: Construct object at specific memory location
- **No-heap**: Avoid dynamic allocation (embedded systems constraint)
- **Stack allocation**: Fixed-size arrays, local objects
- **Memory pools**: Pre-allocated fixed-size blocks
- **Arena allocators**: Large buffer, allocate from it sequentially

### Study Notes
- `new` operator: allocates memory AND constructs object
- Placement `new`: constructs object at existing memory location
- No-heap: Use stack, static storage, or custom allocators
- Memory pools: Pre-allocate fixed-size blocks, reuse them
- Arena: Allocate from large buffer, reset entire arena to free

### Reference
- Placement new: `new(ptr) Type(args)` - constructs at `ptr`
- Must call destructor manually: `obj->~Type()`
- Stack arrays: `Type buffer[100];` - fixed size, automatic cleanup
- `std::array`: Stack-allocated, size known at compile-time
- `alignas`: Specify alignment for stack objects

### Common Patterns
```cpp
// Placement new
#include <new>

class Object {
    int data;
public:
    Object(int d) : data(d) {}
    ~Object() {}
};

// Pre-allocated buffer
alignas(Object) char buffer[sizeof(Object)];

// Construct in buffer
Object* obj = new(buffer) Object(42);

// Use object
obj->do_something();

// Manually destruct
obj->~Object();

// Memory pool (simplified)
template<typename T, size_t PoolSize>
class Pool {
    alignas(T) char storage[PoolSize * sizeof(T)];
    bool used[PoolSize];
    
public:
    T* allocate() {
        for (size_t i = 0; i < PoolSize; ++i) {
            if (!used[i]) {
                used[i] = true;
                return new(storage + i * sizeof(T)) T();
            }
        }
        return nullptr;  // Pool exhausted
    }
    
    void deallocate(T* ptr) {
        ptr->~T();
        // Mark as unused
        size_t index = (ptr - reinterpret_cast<T*>(storage)) / sizeof(T);
        used[index] = false;
    }
};

// Arena allocator
class Arena {
    char* buffer;
    size_t size;
    size_t offset;
    
public:
    Arena(char* buf, size_t sz) : buffer(buf), size(sz), offset(0) {}
    
    template<typename T>
    T* allocate() {
        if (offset + sizeof(T) > size) return nullptr;
        T* ptr = reinterpret_cast<T*>(buffer + offset);
        offset += sizeof(T);
        return new(ptr) T();
    }
    
    void reset() { offset = 0; }  // Free all
};
```

### Gotchas
- Must manually call destructor for placement new objects
- Alignment matters - use `alignas` or `std::aligned_storage`
- No automatic cleanup - must manage lifetime manually
- Buffer overflow: no bounds checking, must track manually
- Placement new doesn't allocate, just constructs

---

## Quick Reference Cheat Sheet

### Memory Regions
- **Stack**: Automatic storage, function locals, fast, limited size
- **Heap**: Dynamic allocation, `new`/`delete`, slower, larger
- **Static**: Global/static variables, program lifetime
- **Code**: Executable instructions, read-only

### Object Lifetime
- **Automatic**: Stack objects, destroyed when scope ends
- **Static**: Global/static, destroyed at program end
- **Dynamic**: Heap objects, destroyed when `delete` called
- **Temporary**: Rvalues, destroyed at end of expression

### Common Patterns
- **RAII**: Acquire in ctor, release in dtor
- **PIMPL**: Pointer to implementation (hide details)
- **CRTP**: Static polymorphism without virtual functions
- **Type traits**: `std::is_same`, `std::enable_if`

### Compiler Flags
- `-std=c++17`: C++ standard version
- `-O2`: Optimize for speed
- `-g`: Include debug symbols
- `-Wall`: Enable all warnings
- `-Wextra`: Extra warnings
- `-Werror`: Treat warnings as errors

---

## Learning Resources

### Books
- Effective Modern C++ (Scott Meyers)
- C++ Templates (Vandevoorde/Josuttis)
- Embedded C++ (various)

### Online
- cppreference.com - Comprehensive reference
- cppcon talks - Conference presentations
- godbolt.org - Compiler Explorer

### Practice
- Implement drivers for common peripherals (SPI, I2C, UART)
- Build memory pool allocator
- Create template-based GPIO library
- Write RAII wrappers for resources
