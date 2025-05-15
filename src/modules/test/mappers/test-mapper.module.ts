import { Module } from '@nestjs/common';
import { TestMapper } from './test.mapper';
import { TestQuestionMapper } from './test-question.mapper';

@Module({
  providers: [TestMapper, TestQuestionMapper],
  exports: [TestMapper],
})
export class TestMapperModule {}
