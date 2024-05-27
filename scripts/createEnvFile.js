const fs = require('fs');

const envContent = `
GOOGLE_ANDROID_CLIENT_ID=${process.env.GOOGLE_ANDROID_CLIENT_ID}
GOOGLE_IOS_CLIENT_ID=${process.env.GOOGLE_IOS_CLIENT_ID}
GOOGLE_WEB_CLIENT_ID=${process.env.GOOGLE_WEB_CLIENT_ID}
GOOGLE_SERVICES_JSON_BASE64=${process.env.GOOGLE_SERVICES_JSON_BASE64}
`;

fs.writeFileSync('.env', envContent.trim());
