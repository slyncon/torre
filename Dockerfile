{
  "hosting": {
    "public": "public",
    "rewrites":[
      {
        "source":"**",
        "function":"app"
      }
    ],
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
