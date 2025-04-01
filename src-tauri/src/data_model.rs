use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize)]
pub struct InlineData {
    pub mime_type: String,
    pub data: String,
}

#[derive(Debug, Serialize)]
pub struct Part {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub inline_data: Option<InlineData>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub text: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct Content {
    pub parts: Vec<Part>,
}

#[derive(Debug, Serialize)]
pub struct GenConfig {
    #[serde(rename = "responseModalities")] 
    pub response_modalities: Vec<String>
}

#[derive(Debug, Serialize)]
pub struct GenerateContentRequest {
    pub contents: Vec<Content>,
    #[serde(rename = "generationConfig")] 
    pub generation_config: GenConfig,
}

#[derive(Debug, Deserialize)]
pub struct InlineDataResponse {
    #[serde(rename = "mimeType")] 
    pub mime_type: String,
    pub data: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "snake_case")] 
pub struct PartResponse {
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(rename = "inlineData")] 
    pub inline_data: Option<InlineDataResponse>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub text: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ContentResponse {
    pub parts: Vec<PartResponse>,
}

#[derive(Debug, Deserialize)]
pub struct Candidate {
    pub content: Option<ContentResponse>,
}

#[derive(Debug, Deserialize)]
pub struct GenerateContentResponse {
    pub candidates: Vec<Candidate>,
}

#[derive(Debug)]
pub struct RequestParams<'a> {
    pub api_key: &'a str,
    pub model_name: &'a str,
    pub prompt: &'a str,
    pub image_type: &'a str,
    pub image_data: &'a str,
}
