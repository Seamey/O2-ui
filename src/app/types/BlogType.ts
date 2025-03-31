export type BlogResponse = {
    date: string; // "2025-02-27 07:12:24"
    code: number; // 200
    message: string; // "All active blogs retrieved successfully"
    data: {
        data: BlogPost[];
        metadata: Metadata;
    };
};

export type BlogPost = {
    uuid: string;
    title: string;
    content: string;
    image: string;
    youtube_videos: string[];
    status: "draft" | "published" | string; // Can be expanded for other statuses
    published_at: string | null; // Null if not published
    views: number;
    created_at: string;
    updated_at: string;
    user: Author;
    tags: {
        uuid: string;
        name: string;
    }[];
    is_bookmarked: boolean;
   
};

type Author = {
    uuid: string;
    name: string;
    email: string;
    avatar: string ;
};

type Metadata = {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
};
// get top blog
export type TopBlogResponse = {
    date: string;  
    code: number;  
    message: string;  // Status message
    data: TopBlog[];  // Array of blog posts
};
export type TopBlog = {
    uuid: string;
    title: string;
    content: string;
    image: string;
    youtube_videos: string[];
    status: "draft" | "published" | string; // Can be expanded for other statuses
    published_at: string | null; // Null if not published
    views: number;
    created_at: string;
    updated_at: string;
    user: Author;
    tags: {
        uuid: string;
        name: string;
    }[];
    is_bookmarked: boolean;
   
};

export type getAllTags ={
    tags: {
        uuid: string;
        name: string;
    }[];
}

export interface BlogCommentsResponse {
    date: string;
    code: number;
    message: string;
    data: {
        blog_uuid: string;
        total_comments: number;
        comments: Comment[];
    };
}

export type LikeResponse = {
    date: string,
    code: number,
    message: string,
    data: {
        likes_count: number
    }
}

// Type for a user who posts a comment
export interface User {
    uuid: string;
    name: string;
    avatar: string | null; // Nullable field
}

// Recursive type for a comment, since comments can have replies
export interface Comment {
    uuid: string;
    content: string;
    user: User;
    parent_uuid?: string | null;
    replies: Comment[];
}

// Type for the data object in the response
export interface CommentsData {
    blog_uuid: string;
    total_comments: number;
    comments: Comment[]; // List of top-level comments
    likes_count: number,
    comments_count: number,
    latest_comments: [],
    user_liked: boolean,
}

// Type for the entire API response
export interface GetCommentsResponse {
    date: string;
    code: number;
    message: string;
    data: CommentsData;
}

// post bookmark
export type PostBookmarkResponse = {
    data: {
        bookmark_uuid: string,
        blog_uuid: string;
    }
}

// get blog detail

// Comment Type
export interface Comment {
    id: number;
    content: string;
    user: User;
    created_at: string;
}

// Blog Type
export interface Blog {
    uuid: string;
    title: string;
    content: string;
    image: string;
    youtube_videos: string[];
    status: string;
    published_at: string | null;
    views: number;
    created_at: string;
    updated_at: string;
    tags: string[];
    user: User;
    likes_count: number;
    comments_count: number;
    latest_comments: Comment[];
    user_liked: boolean;
    is_bookmarked: boolean;
}

// API Response Type
export interface BlogDetailApiResponse {
    date: string;
    code: number;
    message: string;
    data: Blog;
}

// get all bookmark
 export type BookmarkApiResponse = {
    date: string; 
    code: number; 
    message: string; 
    data: Bookmark[]; 
};

export type Bookmark = {
    uuid: string;
    blog: BookmarkBlog; 
    created_at: string; 
};

export type BookmarkBlog = {
    uuid: string; 
    title: string; 
    image: string; 
    status: string; 
    published_at: string;
    tags: {
        uuid: string;
        name: string;
    }[];
    views: number;
    is_bookmarked:boolean;
};

// add blog 
export type AddBlogResponse = {
    date: string; 
    code: number; 
    message: string; 
    data: {
      uuid: string; 
      title: string; 
      content: string; 
      image: string; 
      youtube_videos: string[]; 
      status: string; // "draft"
      published_at: string | null;
      created_at: string; 
      updated_at: string; 
      tags: string[]; 
      user: {
        uuid: string; 
        name: string; 
        email: string; 
      };
    };
  };


  export type AddBlog = {
    title: string;
    content: string;
    image: string;
    youtube_videos: string[];
    tags: string[];
}