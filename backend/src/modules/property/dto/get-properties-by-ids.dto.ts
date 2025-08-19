import { IsArray, IsNotEmpty, IsString, ArrayUnique, IsDefined, MinLength, ArrayMinSize } from "class-validator";

export class GetPropertiesByIdsDto {
  @IsDefined()
  @IsArray()
  @ArrayUnique()
  @ArrayMinSize(1)
  @MinLength(1, { each: true })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  ids: string[]
}