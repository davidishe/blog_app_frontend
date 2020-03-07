export class StudentModel {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    email: string;
    phoneNumber: string;
    enrolledDate: Date;
}

export class ItemModel {
    id?: number;
    firstName: string;
    lastName: string;
    link: string;
    shortLink: string;
    city: string;
    email: string;
    phoneNumber: string;
    enrolledDate?: Date;
    counter?: number;
    qrPath?: string;
}

