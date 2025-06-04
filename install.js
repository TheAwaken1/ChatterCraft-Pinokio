module.exports = {
  run: [
    // Call to download app here -- doesn't exist yet
    {
      "method": "shell.run",
      "params": {
        "message": "echo App directory assumed to be 'app'"
      }
    },
    // Running dependencies first
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install bitsandbytes>=0.43.0"
        ],
      }
    },
    // Installing the requirements
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",
          // xformers: true   // uncomment this line if your project requires xformers
          // triton: true   // uncomment this line if your project requires triton
          // sageattention: true   // uncomment this line if your project requires sageattention
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
            "python -c \"import nltk, os; nltk_data_path = os.path.join(os.getcwd(), 'nltk_data'); os.makedirs(nltk_data_path, exist_ok=True); nltk.data.path.append(nltk_data_path); nltk.download('punkt', download_dir=nltk_data_path, quiet=True); print('NLTK punkt downloaded to', nltk_data_path)\""
        ],  
      }
    },
  ]
}
