use crate::data_model::{Content, GenConfig, GenerateContentRequest, GenerateContentResponse, InlineData, Part, RequestParams};
use reqwest::Client;

use std::{io,vec};

pub async fn process_request<'a>(
    req_param: &RequestParams<'a>,
) -> Result<(Option<(String, String)>, String), Box<dyn std::error::Error>> {
    let client = Client::new();
    let endpoint = format!(
        "https://generativelanguage.googleapis.com/v1beta/models/{}:generateContent?key={}",
        req_param.model_name, req_param.api_key
    );

    let contents = vec![Content {
        parts: vec![
            Part {
                inline_data: Some(InlineData {
                    mime_type: req_param.image_type.to_string(),
                    data: req_param.image_data.to_string(),
                }),
                text: None,
            },
            Part {
                text: Some(req_param.prompt.to_string()),
                inline_data: None,
            },
        ],
    }];

    let request_body = GenerateContentRequest { 
        contents,
        generation_config: GenConfig { response_modalities: vec!["Text".to_string(), "Image".to_string()] }
        
    };
    match client.post(&endpoint).json(&request_body).send().await {
        Ok(response) => {
            let status = response.status();
            if status != 200 {
                let msg = response.text().await?;
                let err_msg = format!("{}::{}",status,msg);
                Err(Box::new(io::Error::new(io::ErrorKind::Other, err_msg)))
            } else {
                let json_resp =  response.json::<GenerateContentResponse>().await?;
                let mut image_response: Option<(String, String)> = None;
                let mut text_response = String::new();
                for candidate in json_resp.candidates {
                    if let Some(content) = candidate.content {
                        for part in content.parts {
                            if let Some(inline_data) = part.inline_data {
                                image_response = Some((inline_data.data, inline_data.mime_type));
                                break;
                            } else if let Some(text) = part.text {
                                text_response.push_str(&text);
                            }
                        }
                    }
                }
                Ok((image_response, text_response))
            }
        }
        Err(e) => {
            eprintln!("error occurred while calling api:: {}", e.to_string());
            Err(Box::new(e))
        }
    }
}