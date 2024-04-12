import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import {createClient} from '@supabase/supabase-js'
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

const googleEmbeddings = new GoogleGenerativeAIEmbeddings({
    modelName: "embedding-001", // 768 dimensions
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    title: "Document title",
    apiKey:"AIzaSyBCN-oAqOV4uvrOLPTUgppeE3DOHrpgxM8"
  });
const sbApiKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzbWxxeXhkcGFlY3R1bmNtbGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzc5NzgsImV4cCI6MjAyNzgxMzk3OH0.BRdinziM4Qgj-jkKGBZCAUhODcgqJv9ki18_n73kh1Y'
  const sbUrl='https://ssmlqyxdpaectuncmlbi.supabase.co'
const client = createClient(sbUrl, sbApiKey)

const vectorStore = new SupabaseVectorStore(googleEmbeddings, {
    client,
    tableName: 'documents',
    queryName: 'match_documents'
})

const retriever = vectorStore.asRetriever()

export { retriever }