"use server";

import EditorPage from "./edit";
export default async function FilesEditPage() {
    return <EditorPage fetch_url="http://localhost:8080/files/rd" post_url="http://localhost:8080/files/wr" />
 
}
