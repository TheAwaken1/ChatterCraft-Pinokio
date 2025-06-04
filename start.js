module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        env: {
         "TORCH_USE_CUDA_DSA": "1"
        },
        path: "app",
        message: [
          "python app.py"
        ],
        on: [{
          "event": "/http:\\/\\/[^=\\s]+/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    }
  ]
}

