
### Meeting Notes:
#### 08/07/2025
- Sam has taken on undergrads, they seem text book oriented
- Worked with them on simplified chunking and embedding, crawl4AI
- Doclings hybrid chunker was all over the place
- Best practices for chunking: 
- How do we want to work together: 
  - Mary wants Sam to guide it, doesn't want her to do it
  - Use it as I see fit
  - Just go off on my own branch and go hard
- If I give away anything just let Sam know
- Chunking methodology:
  - Trying to do re-ranking, written and trained re-ranking models
  - Worries that as soon as you use an LLM, you have probabilities to deal with
  - LangChain has the text splitter, has some fancy and not fancy methods
    - Not fancy: aggregate chunk based on tokens
  - Hybrid chunker: first finds headings, new paragraphs, end in a period
  - This results in very small chunks, not so useful!
  - Cohere is working on the vectorization of things, when you put it in the db are you retrieing it if you need it
  - Massive context windows are great but it has to retrieve the info before it can get the info from
  - Pages composed of lots of components, if you're extracting based on character count you'll break tables apart and other stuff that's important
  - Looking into objects in general is useful
  - A lot of people emulate how OpenAI does their vector search for their assistants
  - read their "How it works", follow those steps! ( we walk through the steps)
  - Cohere is good for the last step, the re-ranking
  - Chunk overlap should be around 50%
  - Merge peers: if you get a small chunk, merge it with another
  - look up LangChain Text Splitting
    - Recursive character text splitting
  - Get into the interactive interpreter window!
  - document is a Langchain object, you can dump it because it has a basemodel structure
  - Everyone uses pydantic objects, OpenAI will return it to you
  - extract out list of tables so you don't chunk those

 please go through it -- it will give you a idea about the chunking step of this RAG process:
https://www.youtube.com/watch?v=8OJC21T2SL4
This guys "ChunkViz" seems useful!!
https://chunkviz.up.railway.app/
and here are the three methods in LangChain that I want you to try out:
https://python.langchain.com/docs/how_to/character_text_splitter/
https://python.langchain.com/docs/how_to/recursive_text_splitter/
https://python.langchain.com/docs/how_to/markdown_header_metadata_splitter/
I would like us to use #2, and #3... but #1 is the intro that I want you to start with.