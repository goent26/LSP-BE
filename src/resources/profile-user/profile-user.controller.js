const service = require('./profile-user.service');
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {
  getProfileUser: catchAsync(async (req, res) => {
    try {
      const userId = req.user.id;
      const userProfile = await service.getProfileUser(userId);

      return new JsonResponse(res, 200)
        .setMainContent(true, 'Profile user ditemukan')
        .setSuccessPayload({ userProfile })
        .send();
    } catch (error) {
      throw new AppError('Gagal mengambil data profile user', 500, error, {
        originalError: error.message,
        stack: error.stack,
      });
    }
  }),

  postProfileUser: catchAsync(async (req, res) => {
    try {
      const userId = req.user.id;
      const data = req.body;

      const createdProfile = await service.createProfileUser(userId, data);

      if (createdProfile.status == false){
        return new JsonResponse(res, 400)
        .setMainContent(false, 'Profile user sudah terbuat')
        .send();
      }else if(createdProfile.status == true){
        return new JsonResponse(res, 201)
        .setMainContent(true, 'Profile user berhasil dibuat')
        .setSuccessPayload({ userProfile: createdProfile.data })
        .send();
      }
      
    } catch (error) {
      throw new AppError('Gagal membuat profile user', 500, error, {
        originalError: error.message,
        stack: error.stack,
      });
    }
  }),

  patchProfileUser: catchAsync(async (req, res) => {
    try {
      const userId = req.user.id;
      const data = req.body;

      const updatedProfile = await service.updateProfileUser(userId, data);

      if(updatedProfile.status == false){
        return new JsonResponse(res, 400)
        .setMainContent(false, 'Profile user belum dibuat')
        .send();
      }else if(updatedProfile.status == true){
        return new JsonResponse(res, 200)
        .setMainContent(true, 'Profile user diperbarui')
        .setSuccessPayload({ userProfile: updatedProfile.data })
        .send();
      }

    } catch (error) {
      throw new AppError('Gagal memperbarui data profile user', 500, error, {
        originalError: error.message,
        stack: error.stack,
      });
    }
  }),

  deleteProfileUser: catchAsync(async (req, res) => {
    try {
      const userId = req.user.id;

      const deleted = await service.deleteProfileUser(userId);

      return new JsonResponse(res, 200)
        .setMainContent(true, 'Profile user berhasil dihapus')
        .setSuccessPayload({ deleted })
        .send();
    } catch (error) {
      throw new AppError('Gagal menghapus profile user', 500, error, {
        originalError: error.message,
        stack: error.stack,
      });
    }
  }),
};
