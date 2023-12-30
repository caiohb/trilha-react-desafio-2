
import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);


  const handleSearchRepo = async () => {

    const {data} = await api.get(`/users/${currentRepo}/repos`)

    data.forEach(element => {
      if(element.id){

        const isExist = repos.find(repo => repo.id === element.id);
  
        if(!isExist){
          setRepos(prev => [...prev, element]);
          setCurrentRepo('')
          return
        }
    }});

    if (!repos)
      alert('Repositório não encontrado')

  }

  const handleRemoveRepo = (id) => {
    console.log('Removendo registro', id);
    const updatedRepos = repos.filter(repository => repository.id !== id);
    setRepos(updatedRepos)
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
