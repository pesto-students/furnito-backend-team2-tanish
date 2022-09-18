import { ApiProperty } from '@nestjs/swagger';

export class VerifyTokenDto {
  @ApiProperty({
    description: 'The token to verify',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNjE5MzVkMjQ3N2Q1MDFmYTI5ZjFkIn0sImlhdCI6MTY2MjM5MzA4NSwiZXhwIjoxNjYyNDIxODg1fQ.lT8kst4mXg84BM7F8mSi5RnhiPT6CbwHfaFOCWsaHP4',
  })
  jwt: string;
}
