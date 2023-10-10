import { Category } from "../../Category/Models/Category.model";

export interface BlogPost {
    id: string,
    title: string;
    shortDescription: string;
    content: string;
    featuredImageUrl: string;
    urlHandle: string;
    publishedDate: Date;
    author: string,
    isVisible: boolean;
    categories: Category[];
}