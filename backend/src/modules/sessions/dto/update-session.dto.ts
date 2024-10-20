import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionDto } from './create-session.dto';
import { ITab } from 'src/modules/tabs/interface/tab.interface';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
}
