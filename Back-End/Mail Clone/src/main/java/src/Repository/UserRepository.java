package src.Repository;

import org.springframework.data.repository.CrudRepository;
import src.Model.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findUserByUsername(String username);
}
