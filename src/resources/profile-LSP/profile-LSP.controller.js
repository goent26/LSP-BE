const service = require('./profile-LSP.service');
const serviceSkema = require('../skema/skema.service');
const serviceUser = require('../users/users.service');
const serviceSertifikasi = require('../sertifikasi/sertifikasi.service');
const serviceTuk = require('../tuk/tuk.service');
const { catchAsync, AppError, JsonResponse } = require('../../utils');

module.exports = {

  getAll: catchAsync(async (req, res) => {
    try {
      const getSkema = await serviceSkema.countAll();
      const getAsesor = await serviceUser.countAll({ role: "asesor" });
      const getTuk = await serviceTuk.countAll();
      const getSertikasi = await serviceSertifikasi.countAll();

      const getData = await service.getAll();

      return new JsonResponse(res, 200)
        .setMainContent(true, "Data profile LSP ditemukan")
        .setSuccessPayload({ 
          count_skema: getSkema,
          count_asesor: getAsesor,
          count_sertifikasi: getSertikasi,
          count_tuk: getTuk,
          data: getData
        })
        .send();
    } catch (error) {
      throw new AppError("Gagal mengambil data profile LSP", 500, error, {
        originalError: error.message,
        stack: error.stack,
      });
    }
  }),

  getOne: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;

      const found = await service.getOne(id);
      if (!found) {
        throw new AppError("Profile LSP tidak ditemukan", 404);
      }

      return new JsonResponse(res, 200)
        .setMainContent(true, "Profile LSP ditemukan")
        .setSuccessPayload({ data: found })
        .send();
    } catch (error) {
      throw new AppError("Gagal mengambil detail profile LSP", 500, error, {
        originalError: error.message,
        stack: error.stack,
      });
    }
  }),

  createOne: catchAsync(async (req, res) => {
    try {
      const data = req.body;

      const created = await service.createOne(data);

      return new JsonResponse(res, 201)
      .setMainContent(true, "profile lsp created successfully" )
      .setSuccessPayload({
        data: created
      })
      .send();
    } catch (error) {
      // Kamu bisa custom pesan atau status di sini
      throw new AppError('Gagal membuat profile LSP', 500, error,{
        originalError: error.message,
        stack: error.stack,
      });
    }

  }),

  updateOneById: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updated = await service.updateOneById(id, data);
      if (!updated) {
        throw new AppError("Profile LSP tidak ditemukan atau gagal diperbarui", 404);
      }

      return new JsonResponse(res, 200)
        .setMainContent(true, "Profile LSP berhasil diperbarui")
        .setSuccessPayload({ data: updated })
        .send();
    } catch (error) {
      throw new AppError("Gagal memperbarui profile LSP", 500, error, {
        originalError: error.message,
        stack: error.stack,
      });
    }
  }),

  deleteOneById: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await service.deleteOneById(id);
      if (!deleted) {
        throw new AppError("Profile LSP tidak ditemukan atau gagal dihapus", 404);
      }

      return new JsonResponse(res, 200)
        .setMainContent(true, "Profile LSP berhasil dihapus")
        .send();
    } catch (error) {
      throw new AppError("Gagal menghapus profile LSP", 500, error, {
        originalError: error.message,
        stack: error.stack,
      });
    }
  }),
}