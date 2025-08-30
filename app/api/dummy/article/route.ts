import { NextResponse } from "next/server";

export type ResponseDummyArticle = {
  data: {
    id: string;
    title: string;
    content: string;
    userId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    imageUrl?: string;
    category: {
      id: string;
      name: string;
      userId: string;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      id: string;
      username: string;
      role: string;
    };
  }[];
  total: number;
  page: number;
  limit: number;
};

export async function GET() {
  const response = {
    data: Array.from({ length: 6 }).map((_, idx) => ({
      id: String(idx + 1),
      title: `Article Title ${idx + 1}`,
      content: `This is the content for article ${idx + 1}.`,
      userId: "1",
      categoryId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl:
        "https://i.pinimg.com/736x/61/99/16/619916e8690c7487680f3183dbe19e63.jpg",
      category: {
        id: "1",
        name: idx % 2 === 0 ? "Design" : "Development",
        userId: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      user: {
        id: "1",
        username: "andika",
        role: "User",
      },
    })),
    total: 6,
    page: 1,
    limit: 6,
  };

  return NextResponse.json(response);
}
