import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { unauthorizedUserGuard } from './unauthorized-user.guard';

describe('unauthorizedUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unauthorizedUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
