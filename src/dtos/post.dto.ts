import { IsNotEmpty, IsOptional, IsString } from "class-validator";

class PostDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  title: string

  @IsOptional()
  content: string;


  @IsOptional()
  img: string;
}

export { PostDTO };
