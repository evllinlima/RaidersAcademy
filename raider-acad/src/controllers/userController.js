const User = require('../models/userModel');

// Registrar um novo usuário
exports.registerUser = async function (req, res) {
    try {
        // Verificar se já existe um usuário com o mesmo email
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email já cadastrado. Tente outro." });
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        
        // Salvar o usuário no banco de dados
        await user.save();

        // Após o registro, redireciona para a página de perfil do usuário
        res.redirect(`/profile/${user._id}`);
    } catch (error) {
        res.status(500).json({ message: `Erro ao registrar o usuário: ${error.message}`, error });
    }
};

// Fazer login
exports.loginUser = async function (req, res) {
    try {
        // Encontre o usuário com base no email
        let user = await User.findOne({ email: req.body.email });
        
        if (!user || user.password !== req.body.password) {
            return res.status(400).json({ message: "Email ou senha incorretos" });
        }

        // Se o login for bem-sucedido, redireciona para a página de perfil com o id do usuário
        res.redirect(`/profile/${user._id}`);
    } catch (error) {
        res.status(500).json({ message: `Erro ao logar: ${error.message}` });
    }
};

// Obter informações do usuário pelo ID
exports.getUser = async function (req, res) {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.render('profile', { user });
    } catch (error) {
        res.status(500).json({ message: `Erro ao carregar o perfil: ${error.message}` });
    }
};

// Atualizar as informações do usuário
exports.updateUser = async function (req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json({ message: "Usuário atualizado com sucesso!", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o usuário", error });
    }
};

// Deletar o usuário pelo ID
exports.deleteUser = async function (req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o usuário", error });
    }
};
