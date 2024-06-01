import { createUploadthing, type FileRouter } from 'uploadthing/next'
// import { auth } from '@clerk/nextjs'

const f = createUploadthing()



// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  avatar: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
  
    .onUploadComplete(() => {}),
  agencyLogo: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
  
    .onUploadComplete(() => {}),
    proof: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })

    .onUploadComplete(() => {}),
  media: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
   
    .onUploadComplete(() => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter