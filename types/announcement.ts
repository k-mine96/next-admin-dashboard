export interface Announcement {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnnouncementDto {
  title: string;
  content: string;
  isPinned?: boolean;
}

export interface UpdateAnnouncementDto {
  title?: string;
  content?: string;
  isPinned?: boolean;
}
