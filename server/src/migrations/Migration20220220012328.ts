import { Migration } from '@mikro-orm/migrations';

export class Migration20220220012328 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "todo" ("id" varchar(255) not null, "description" varchar(255) not null, "completed" boolean not null default false);');
    this.addSql('alter table "todo" add constraint "todo_pkey" primary key ("id");');
  }

}
