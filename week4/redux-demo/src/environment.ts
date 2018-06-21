const dev = {
  context: 'https://p5w5u7kg9g.execute-api.us-east-1.amazonaws.com/dev/'
}

const prod = {
  context: 'http://ec2-54-167-136-172.compute-1.amazonaws.com:3001/'
  
}

export const environment = process.env.NODE_ENV === 'production'
  ? prod
  : dev
