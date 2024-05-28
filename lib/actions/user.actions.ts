"use server";

import { createAdminClient, createSessionClient } from "../appwrite";
import { AppwriteException, Client, ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { randomBytes } from "crypto";
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "react-hot-toast";

const {

  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_ADMIN_COLLECTION_ID:  ADMIN_COLLECTION_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_ID,
  APPWRITE_TRANSACTION_WITHDRAW_COLLECTION_ID: WITHDRAW_ID,
  APPWRITE_STORAGE_ID: STORAGE_ID

} = process.env;



interface UserDocument {
  $id?: string;
  balance?: number;
  userId?: string;
  document?: any
  // Add other fields as necessary
}



export const getUserInfo = async({userId}:getUserInfoProps) =>{

  try {

    const {database} = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    )

    return parseStringify(user.documents[0])
    
  } catch (error) {
    console.log(error)
  }


}



export const getAdminInfo = async({userId}:getUserInfoProps) =>{

  try {

    const {database} = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      ADMIN_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    )

    return parseStringify(user.documents[0])
    
  } catch (error) {
    console.log(error)
  }


}
export const signIn = async ({ email, password }: signInProps) => {
  try {
    // Mutation
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    
    cookies().set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({userId: response.userId})
    return parseStringify(user);
  } catch (error:any) {
    console.log("error", error);
    // return error;

  //   if (error instanceof AppwriteException) {
  //     // Handle Appwrite-specific errors (e.g., email conflicts)
  //     return parseStringify({
  //             success: false,
  //             error: { code: error.code, message: error.message },
  //         })
          
    
  
    
    
  // }
};
}

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;
    try {
      // Mutation (Create user account)
      const { account, database } = await createAdminClient();
      const  balance  = 0
      const newUserAccount = await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`,
      );
  

      const newUser = await database.createDocument(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        ID.unique(),
        
        {
          ...userData,
          userId: newUserAccount.$id,
          balance: balance,
          
        }
      )

      
      // Create email session (for immediate login)
      const session = await account.createEmailPasswordSession(email, password);
      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
  
      // Email verification using magic URL (ensure custom domain configuration for production)
      if (newUserAccount) {
        const verificationToken = await account.createMagicURLToken(
          ID.unique(),
          email,
          // Replace with your custom domain for verification URL (e.g., "https://your-app-domain.com/verify")
          'http://localhost:3000' // Temporary workaround for local development
        );
  
        // Send the verification email to the user with the verificationToken.secret
        // You'll need to implement email sending logic using a service like SendGrid or your preferred provider.
  
        return parseStringify({ user: newUserAccount}); // Indicate unverified state
      }
  
      return parseStringify(newUser); // Shouldn't normally reach here
    } catch (error:any) {
      console.error("SignUp Error:", error);
      // throw error; // Re-throw for potential error handling in the frontend
     
  };
}
  
// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({userId: result.$id})



    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete("appwrite-session");

    await account.deleteSession("current");
    return true;
  } catch (error) {
    return null;
  }
};

// export const emailOtp = async ({ otp }: OtpParams) => {
//   const { account } = await createAdminClient();
//   const promise = account.createEmailToken(
//     ID.unique(),
//     "email@example.com",
//     true
//   );

//   promise.then(
//     function (response) {
//       console.log(response); // Success
//     },
//     function (error) {
//       console.log(error); // Failure
//     }
//   );
// };

// ADMIN
export async function getAdminLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getAdminInfo({userId: result.$id})



    return parseStringify(user);
  } catch (error) {
    return null;
  }
}


export const adminSignIn = async ({ email, password }: signInProps) => {
  try {
    // Mutation
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    
    cookies().set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getAdminInfo({userId: response.userId})
    return parseStringify(user);
  } catch (error) {
    console.log("error", error);
  }
};



export const adminGetUsers = async () => {

  try {

    const { account, database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
     
    )

    return parseStringify(user.documents)
    
  } catch (error) {

    console.error("Error fetching users:", error);
    
  }


}


export const adminGetAllTransaction = async () => {

  try {

    const { account, database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_ID!,
     
    )

    return parseStringify(user.documents)
    
  } catch (error) {

    console.error("Error fetching users:", error);
    
  }


}


export const getUserInfoParams = async({userId}:getUserInfoProps) =>{

  try {

    const {database} = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    )

    return parseStringify(user.documents[0])


   
    
  } catch (error) {
    console.log(error)
  }


}






export const UserDeposit = async (userData: Deposit) => {

  try {
    // Mutation (Create user account)
    const {  database } = await createAdminClient();

    const { account } = await createSessionClient();
  
    const result = await account.get();

    const user =  result.$id

    const typeofTransaction = 'DEPOSIT'
    const transactionId = parseInt(randomBytes(5).toString('hex'), 16); 


    // file

    const uploadedFile = await uploadFile(userData.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }


    const newUser = await database.createDocument(
      DATABASE_ID!,
      TRANSACTION_ID!,
      ID.unique(),
      
      {
        ...userData,
        user,
        typeofTransaction,
        transactionId,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,

      
      }
    )

   

    return parseStringify(newUser); // Shouldn't normally reach here
  } catch (error) {
    console.error("SignUp Error:", error);
    throw error; // Re-throw for potential error handling in the frontend
  }
};


export const UserWithdraw = async (userData: Withdraw , balance:any) => {


  try {
    // Mutation (Create user account)
    const {  database } = await createAdminClient();

    const { account } = await createSessionClient();
  
    const result = await account.get();

    const user =  result.$id
  
    const balances = balance
    const amount = userData.amount

    const status = 'pending'
    const transactionId = parseInt(randomBytes(5).toString('hex'), 16); 
    const balancecheck = balances <= amount!

const userId = user

      const newUser = await database.createDocument(
        DATABASE_ID!,
        WITHDRAW_ID!,
        ID.unique(),
        
        {
          ...userData,
          user,
          status,
          transactionId,
   
        }
      )
  
      if(newUser){
        const balanced = balance.balance
    const newBalance = balanced - amount!;
    const document = await getDocumentIdByUserId(userId);
    console.log(balance, newBalance)

    const documentId = document.$id;

    const newUser = await database.updateDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      documentId!,
     
      {
        balance: newBalance,
      }
    );
      }
      return parseStringify(newUser); // Shouldn't normally reach here
    
      
  

    
  } catch (error) {
    console.error("SignUp Error:", error);
    throw error; // Re-throw for potential error handling in the frontend
  }
    

   
};


export const getUserTransaction = async({userId}:getUserInfoProps) =>{

  try {

    const {database} = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_ID!,
      [Query.equal("user", userId)]
    )

    return parseStringify(user.documents)
    
  } catch (error) {
    console.log(error)
  }


}

export const getUserWithdrawalTransaction = async({userId}:getUserInfoProps) =>{

  try {

    const {database} = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      WITHDRAW_ID!,
      [Query.equal("user", userId)]
    )

    return parseStringify(user.documents)
    
  } catch (error) {
    console.log(error)
  }


}



export const getUserTransactionTest = async() =>{

  try {

    const {database} = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_ID!,
     
    )

    return parseStringify(user.documents[0])
    
  } catch (error) {
    console.log(error)
  }


}

// export const getUserTransactionbyId = async(userId:any) =>{

//   try {

//     const {database} = await createAdminClient();

//     const user = await database.listDocuments(
//       DATABASE_ID!,
//       TRANSACTION_ID!,
//       [Query.equal("user", userId)]
//     )

//     return parseStringify(user.documents[0])
    
//   } catch (error) {
//     console.log(error)
//   }


// }


const getDocumentIdByUserId = async (userId: any): Promise<UserDocument> => {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    );

    if (response.documents.length === 0) {
     console.log(`No document found for userId: ${userId}`);
    }

    // Assuming userId is unique, we take the first document
    const document = response.documents[0];
    return document
   
  } catch (error) {
    console.error("Error getting document by userId:", error);
    throw error;
  }
};

const getDocumentIdStatusByUserId = async (userId:any): Promise<UserTransactionDoc> => {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_ID!,
      [Query.equal('user', userId)]
    );

    if (response.documents.length === 0) {
      throw new Error(`No document found for userId: ${userId}`);
    }

    // Assuming userId is unique, we take the first document
    return parseStringify(response.documents[0])
    // return document;
  } catch (error) {
    console.error("Error getting document by userId:", error);
    throw error;
  }
};


export const UserUpdateBalance = async (userDataBalance: UpdateBalance, { userId }: getUserInfoProps) => {
  const { amount} = userDataBalance;
  try {
    // Mutation (Update user account balance)
    const { database } = await createAdminClient();
    const document = await getDocumentIdByUserId(userId);

    const documentId = document.$id;
    const currentBalance = document.balance;

    console.log(currentBalance,amount)

    // Calculate the new balance
    const newBalance = currentBalance! + Number(amount);

    const newUser = await database.updateDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      documentId!,
     
      {
        balance: newBalance,
      }
    );

    return parseStringify(newUser); // Shouldn't normally reach here
  } catch (error) {
    console.error("Update Balance Error:", error);
    throw error; // Re-throw for potential error handling in the frontend
  }
};


export const UserUpdateStatus = async (userStatus: UpdateStatus) => {
  const { status, transactionId, userId, amount} = userStatus;
  try {
    // Mutation (Update user account balance)
    const { database } = await createAdminClient();
    // const transaction = await getDocumentIdStatusByUserId(userId);
    // const document = await getDocumentIdByUserId(userId)

    // const documentId = document.$id;
    // const transactionId = transaction.transactionId
    // const currentBalance = document.balance;

    console.log(transactionId, userId, status, amount)

    // Calculate the new balance
    // const newBalance = currentBalance + Number(amount);

    // const newUser = await database.updateDocument(
    //   DATABASE_ID!,
    //   USER_COLLECTION_ID!,
    //   documentId,
     
    //   {
       
    //   }
    // );

    // return parseStringify(newUser); // Shouldn't normally reach here
  } catch (error) {
    console.error("Update Balance Error:", error);
    throw error; // Re-throw for potential error handling in the frontend
  }
};

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {

  const { storage } = await createAdminClient();
  try {
    const uploadedFile = await storage.createFile(
      STORAGE_ID!,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FILE URL
export async function getFilePreview(fileId: string) {
  const { storage } = await createAdminClient();
  try {
    const fileUrl = storage.getFilePreview(
      STORAGE_ID!,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}


// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  const { storage } = await createAdminClient();
  try {
    await storage.deleteFile(STORAGE_ID!, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}