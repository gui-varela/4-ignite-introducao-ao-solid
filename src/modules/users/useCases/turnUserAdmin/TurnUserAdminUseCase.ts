import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);
    const isUserAdmin = user.admin;

    if (!user) {
      throw new Error("Can not turn a non existing user admin");
    }
    if (isUserAdmin) {
      throw new Error("This user is already an admin!");
    }

    const userTurnedToAdmin = this.usersRepository.turnAdmin(user);
    return userTurnedToAdmin;
  }
}

export { TurnUserAdminUseCase };
