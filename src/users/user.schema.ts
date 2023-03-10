import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema()
export class User {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @Prop({ type: Types.ObjectId })
    _id: string;

    @ApiProperty({ example: 'John Doe', description: 'Username' })
    @Prop({ required: true })
    username: string;

    @ApiProperty({ example: 'simplemail@gmail.com', description: 'Email' })
    @Prop({ unique: true, required: true })
    email: string;

    @ApiProperty({ example: 'wasd1234', description: 'Password' })
    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
