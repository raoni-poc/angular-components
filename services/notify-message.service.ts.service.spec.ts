import { TestBed } from '@angular/core/testing';

import { NotifyMessage.Service.TsService } from './notify-message.service.ts.service';

describe('NotifyMessage.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotifyMessage.Service.TsService = TestBed.get(NotifyMessage.Service.TsService);
    expect(service).toBeTruthy();
  });
});
