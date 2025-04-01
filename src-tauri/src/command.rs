use crate::data_model::RequestParams;
use crate::utils::process_request;

#[tauri::command]
pub async fn generate_result(
    api_key: String,
    file_type: String,
    file_data: String,
    user_prompt: String,
) -> Result<((String, String), String), String> {
    let params = &RequestParams {
        api_key: &api_key,
        model_name: "gemini-2.0-flash-exp",
        prompt: &user_prompt,
        image_type: &file_type,
        image_data: &file_data,
    };
    match process_request(params).await {
        Ok((image_response, text_response)) => {
            let empty_response = "".to_string();
            if let Some(img_data) = image_response {
                Ok((img_data, empty_response))
            } else {
                Ok((
                    (empty_response.clone(), empty_response.clone()),
                    text_response,
                ))
            }
        }
        Err(e) => {
            eprintln!("error occurred:: {}", e.to_string());
            Err(e.to_string())
        }
    }
}
