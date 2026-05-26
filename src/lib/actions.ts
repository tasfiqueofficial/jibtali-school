"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const data = Object.fromEntries(formData.entries());
    await signIn("credentials", {
      ...data,
      redirect: true,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const StudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rollNo: z.string().min(1, "Roll number is required"),
  classId: z.string().min(1, "Class selection is required"),
});

export async function createStudent(formData: FormData) {
  const validatedFields = StudentSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    throw new Error(JSON.stringify(validatedFields.error.flatten().fieldErrors));
  }

  const { name, email, password, rollNo, classId } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "STUDENT",
        student: {
          create: {
            rollNo,
            classId,
          },
        },
      },
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error("Email or Roll No already exists");
    }
    throw new Error("Database Error: Failed to create student");
  }

  revalidatePath("/admin/students");
  redirect("/admin/students");
}

const TeacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  designation: z.string().min(1, "Designation is required"),
  phone: z.string().optional(),
});

export async function createTeacher(formData: FormData) {
  const validatedFields = TeacherSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    throw new Error(JSON.stringify(validatedFields.error.flatten().fieldErrors));
  }

  const { name, email, password, designation, phone } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "TEACHER",
        teacher: {
          create: {
            designation,
            phone,
          },
        },
      },
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error("Email already exists");
    }
    throw new Error("Database Error: Failed to create teacher");
  }

  revalidatePath("/admin/teachers");
  redirect("/admin/teachers");
}

const NoticeSchema = z.object({
  title: z.string().min(2, "Title is required"),
  content: z.string().min(5, "Content must be at least 5 characters"),
  classId: z.string().optional().nullable(),
});

export async function createNotice(formData: FormData) {
  const validatedFields = NoticeSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    throw new Error(JSON.stringify(validatedFields.error.flatten().fieldErrors));
  }

  const { title, content, classId } = validatedFields.data;

  try {
    await prisma.notice.create({
      data: {
        title,
        content,
        classId: classId === "" ? null : classId,
      },
    });
  } catch (error) {
    throw new Error("Database Error: Failed to create notice");
  }

  revalidatePath("/admin/notices");
  revalidatePath("/notice");
  redirect("/admin/notices");
}

export async function markAttendance(
  classId: string,
  attendanceData: { studentId: string; status: boolean }[]
) {
  try {
    await prisma.$transaction(
      attendanceData.map((item) =>
        prisma.attendance.create({
          data: {
            studentId: item.studentId,
            status: item.status,
            date: new Date(),
          },
        })
      )
    );
    revalidatePath("/teacher/attendance");
    return { success: true };
  } catch (error) {
    return { error: "Failed to mark attendance" };
  }
}

export async function createResults(
  subjectId: string,
  examType: string,
  resultsData: { studentId: string; marks: number }[]
) {
  try {
    await prisma.$transaction(
      resultsData.map((item) =>
        prisma.result.create({
          data: {
            studentId: item.studentId,
            subjectId,
            marks: item.marks,
            grade: calculateGrade(item.marks),
            examType,
          },
        })
      )
    );
    revalidatePath("/teacher/results");
    return { success: true };
  } catch (error) {
    return { error: "Failed to save results" };
  }
}

function calculateGrade(marks: number): string {
  if (marks >= 80) return "A+";
  if (marks >= 70) return "A";
  if (marks >= 60) return "A-";
  if (marks >= 50) return "B";
  if (marks >= 40) return "C";
  if (marks >= 33) return "D";
  return "F";
}
