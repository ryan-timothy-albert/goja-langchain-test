import { OpenAIChat } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const f = async () => {
  const model = new OpenAIChat();
  const text = "pretend openapi blah blah blah blah";
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
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