import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

class PostDTO {
  @IsNotEmpty({ message: 'Author id is required' })
  @IsNumber()
  authorId: number;

  @IsNotEmpty({ message: 'Title name is required' })
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  img: string;
}

class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  img?: string;
}

export { PostDTO, UpdatePostDto };
