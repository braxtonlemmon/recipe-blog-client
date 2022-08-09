declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_ACCESS_KEY_ID: string
      AWS_SECRET_ACCESS_KEY: string
      GATSBY_SENDGRID_API: string
      GATSBY_SENDGRID_LIST_ID: string
      SANITY_TOKEN: string
      SANITY_PROJECT_ID: string
      SANITY_DATASET: string
    }
  }
}

export {}
