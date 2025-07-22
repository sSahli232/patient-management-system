import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/core/app.module';
import { IFixture } from './fixture';

export class TestApp {
  private app: INestApplication;
  private moduleRef: TestingModule;

  async setup(): Promise<void> {
    try {
      this.moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      this.app = this.moduleRef.createNestApplication();
      await this.app.init();
    } catch (error) {
      console.error('Setup failed:', error);
      throw error;
    }
  }

  async cleanup(): Promise<void> {
    if (this.app) {
      await this.app.close();
    }
    if (this.moduleRef) {
      await this.moduleRef.close();
    }
  }

  async loadFixtures(fixtures: IFixture[]): Promise<unknown[]> {
    if (!this.app) {
      throw new Error('Application not initialized. Call setup() first.');
    }
    return Promise.all(fixtures.map((fixture) => fixture.load(this)));
  }

  get<T>(token: any): T {
    if (!this.app) {
      throw new Error('Application not initialized. Call setup() first.');
    }
    return this.app.get<T>(token);
  }

  getHttpServer(): any {
    if (!this.app) {
      throw new Error('Application not initialized. Call setup() first.');
    }
    return this.app.getHttpServer();
  }
}
