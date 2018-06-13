const dev = {
  context: 'http://localhost:3001/'
}

const prod = {
  context: 'ec2-54-167-136-172.compute-1.amazonaws.com:3001/'
  
}

export const environment = process.env.NODE_ENV === 'production'
  ? prod
  : dev
