const getDB = () => {
  if (!global.DB) throw new Error("Database not initialized");
  return global.DB;
};

module.exports = {

  async getAll(){
    const DB = getDB();

    return await DB.profileLSP.findMany();
  },

  async getOne(id){
    return await DB.profileLSP.findUnique({
      where: { id: (id) },
    });
  }, 
  async createOne(data){
    const DB = getDB();

    const {
      no_sk_lisensi,
      no_lisensi,
      jenis,
      alamat,
      website_link,
      no_fax,
      no_hp, 
      email
    } = data;

    const profileLSP = await DB.profileLSP.create({
      data: {
        no_sk_lisensi,
        no_lisensi,
        jenis,
        alamat,
        website_link,
        no_fax,
        no_hp,
        email
      }
    })
    return profileLSP
  },

  async updateOneById(id, data){
    try {
      return await DB.profileLSP.update({
        where: { id: (id) },
        data,
      });
    } catch (error) {
      return null;
    }
  },

  async deleteOneById(id){
    const DB = getDB();
    try {
      return await DB.profileLSP.delete({
        where: { id: (id) },
      });
    } catch (error) {

      return null;
    }
  },
}