import { TestBed } from '@angular/core/testing';

import { MobiusMusicService } from './mobius-music.service';

describe('MobiusMusicService', () => {
  let service: MobiusMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobiusMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
