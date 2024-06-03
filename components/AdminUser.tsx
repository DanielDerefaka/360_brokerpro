import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { adminGetUsers } from "@/lib/actions/user.actions";
import { Button } from "./ui/button";
import Link from "next/link";

const AdminUserTable = async () => {
  const userlist = await adminGetUsers();

  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Image</TableHead>
          <TableHead className="px-2">Name</TableHead>
          <TableHead className="px-2">Email</TableHead>
          <TableHead className="px-2">State</TableHead>
          <TableHead className="px-2">User Profile</TableHead>
        </TableRow>
      </TableHeader>

      {userlist.map((user: any) => (
        <TableBody key={user.userId}>
          <TableRow>
            <TableCell className="font-medium">
              <div className="profile-img_admin">
                <span className="text-2xl font-bold text-blue-500">
                  {user.firstName[0]}
                </span>
              </div>
            </TableCell>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="">{user.state} </TableCell>
            <TableCell className="">
              <Link href={`/admin/pages/profile/?userId=${user.userId}`}>
                <Button className="form-btn">Profile</Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
};

export default AdminUserTable;
