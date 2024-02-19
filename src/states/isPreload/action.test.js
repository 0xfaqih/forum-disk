import api from "../../utils/api";
import {
   afterEach, beforeEach, describe, expect, it, vi,
 } from 'vitest';
import { asyncPreloadProcess } from "./action";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { setAuthUserActionCreator } from "../authUser/action";

const fakeUserResponse = [
   {
     id: 'user-123',
     name: 'John Doe',
     email: 'john@example.com',
     avatar: 'https://generated-image-url.jpg',
   },
 ];

 describe('asyncPreloadProcess thunk', () => {
   beforeEach(() => {
   api._getOwnProfile = api.getOwnProfile;
   })

   afterEach(() => {
      api.getOwnProfile = api._getOwnProfile;

      delete api._getOwnProfile;
   })

   it('should dispatch action correctly when data fecthing is success', async () => {
      api.getOwnProfile = () => Promise.resolve(fakeUserResponse);
      
      const dispatch = vi.fn();

      await asyncPreloadProcess()(dispatch);
      expect(dispatch).toHaveBeenCalled(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
   })

   it('should dispatch action and call alert correctly when data fecthing failed', async () => {
      api.getOwnProfile = () => Promise.reject(null);
  
      const dispatch = vi.fn();
  
      await asyncPreloadProcess()(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
   })
})