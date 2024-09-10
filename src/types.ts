export interface Config {
  projectStructure: {
    include: string[]
    exclude: string[]
  }
  textFiles: {
    include: string[]
    exclude: string[]
  }
  dot?: boolean
}
