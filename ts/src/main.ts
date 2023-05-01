import { OpenAIChat } from "langchain/llms/openai";
import { ChatVectorDBQAChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const f = async () => {
  const model = new OpenAIChat({openAIApiKey: ""});
  const text = "pretend openapi blah blah blah blah";
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings({openAIApiKey: "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"}));
  const chain = ChatVectorDBQAChain.fromLLM(
    model,
    vectorStore,
  );

  
  const question = "How many paths are defined in the provided OpenAPI spec?";
  const res = await chain.call({ question, chat_history: [] });
  console.log(res);


  const chatHistory = question + res.text;
  const followUpRes = await chain.call({
    question: "What are those paths?",
    chat_history: chatHistory,
  });
  console.log(followUpRes);
  return ""
};