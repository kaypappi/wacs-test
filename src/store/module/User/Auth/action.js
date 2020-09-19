import * as user from "../../../Api/user";

export const CreateUserAccount = async ({ commit, dispatch }, form) => {
  commit("CREATING_USER", true);
  user.CreateUserAccount(form).then((response) => {});
};
