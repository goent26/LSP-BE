const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

module.exports = {
  async getProfileUser(userId) {
    const db = getDB();

    const userProfile = await db.profileUser.findUnique({
      where: {
        user_id: userId,
      },
    });
    return userProfile;
  },

  async createProfileUser(userId, data) {
    const db = getDB();

    const {
      NIK,
      no_registrasi,
      nama_lengkap,
      asal_sekolah,
      kompetensi,
      PNS,
      masa_berlaku,
      kebangsaan,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      alamat,
      kode_pos,
      no_telp,
    } = data

    const existing = await db.ProfileUser.findUnique({
      where: {
        user_id: userId,
      },
    });
    if(existing){
      return {status : false}
    }else{
      const createdProfile = await db.ProfileUser.create({
        data: {
          NIK,
          no_registrasi,
          nama_lengkap,
          asal_sekolah,
          kompetensi,
          PNS,
          masa_berlaku,
          kebangsaan,
          tempat_lahir,
          tanggal_lahir,
          jenis_kelamin,
          alamat,
          kode_pos,
          no_telp,
          user_id: userId,
        },
      });
    return {status : true, data: createdProfile};
      
    }
  },

  async updateProfileUser(userId, data) {
    const db = getDB();

    const {
      NIK,
      no_registrasi,
      nama_lengkap,
      asal_sekolah,
      kompetensi,
      PNS,
      masa_berlaku,
      kebangsaan,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      alamat,
      kode_pos,
      no_telp,
    } = data

    const existing = await db.ProfileUser.findUnique({
      where: {
        user_id: userId,
      },
    });

    if(!existing){
      return {status : false}
    }else{
    const updatedProfile = await db.profileUser.update({
      where: {
        user_id: userId,
      },
      data: {
      NIK,
      no_registrasi,
      nama_lengkap,
      asal_sekolah,
      kompetensi,
      PNS,
      masa_berlaku,
      kebangsaan,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      alamat,
      kode_pos,
      no_telp,
      }
    });

    return {status: true, data: updatedProfile};
  }
},

  async deleteProfileUser(userId) {
    const db = getDB();

    const deletedProfile = await db.profileUser.delete({
      where: {
        user_id: userId,
      },
    });

    return deletedProfile;
  },
};
