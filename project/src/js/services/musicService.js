module.factory('musicService',['$rootScope','server', function (rootScope, server){
    var service = {

       music: null,
       musics: [
                  {
                    'id': 0,
                    'slug': 'escravo-da-alegria',
                    'nome': 'Escravo da Alegria',
                    'autor': 'Toquinho',
                    'video': 'gRPPBn9j7Nw',
                    'estrofes': 5,
                    'letra': {
                      '1': 'E eu que andava nessa escuridão, De repente<br> foi me acontecer, me roubou o sono e a solidão, me<br> mostrou o que eu temia ver, sem pedir licença e<br> nem perdão, veio louca pra me enlouquecer<br><br>',

                      '2': 'Vou dormir querendo despertar, pra depois de<br> novo conviver com essa luz que veio me habitar,<br> com esse fogo que me faz arder. Me dá medo e vem<br> me encorajar. Fatalmente me fará sofrer<br><br>',

                      '3': 'Ando escravo da alegria, hoje em dia, minha<br> gente isso não é normal. Se o amor é fantasia, eu me<br> encontro ultimamente em pleno carnaval<br><br>',

                      '4': 'Ando escravo d\'alegria, isso não é normal. Se o<br> amor é fantasia, eu me encontro em pleno carnaval<br><br>',

                      '5': 'Eu, nessa escuridão, de repente me roubou o<br> sono, mostrou o que eu temia, sem pedir licença<br> e nem perdão. Veio louca pra me enlouquecer,<br> vou dormir, despertar, pra novo conviver. Com<br> essa luz que veio, com esse fogo faz arder. Me dá<br> medo, vem me encorajar, fatalmente me fará sofrer.<br> Ando escravo d\'alegria, isso não é normal. Se o<br> amor é fantasia, eu me encontro em pleno carnaval<br><br>'
                    }
                  },
                  {
                    'id': 1,
                    'slug': 'pim-pam-pum',
                    'nome': 'PIM PAM PUM',
                    'autor': 'Oscar A. Torales',
                    'video': '8hTrZ8KQ2m0',
                    'estrofes': 4,
                    'letra': {
                      '1': 'Canta, conta um conto, que quem canta encantará<br> Canta comigo, cam cararam cam cam<br> Pega a pedra, o pé de pato, a pipa, o pó e a pá<br> Pega pintando, pam pararam pam pam<br><br>',

                      '2': 'Com as mãos de um anãozinho, mas a força<br> de um gigantão. A resposta é sim, eu sei<br> quem sou, eu sei pra onde ir, eu vou te<br> ver, quando o dia surgir, eu sei quem<br> sou, eu tenho pra onde ir, eu vou te ver<br> Bom dia!<br><br>',

                      '3': 'Bate bem a bola, bate o bumbo, bataplan<br> Brinca brilhando, bam bararam bam bam<br> Tenta tocar tudo tendo, tudo prá tentar<br> Tenta tocando, tam tararam tam tam<br>',

                      '4': 'Com as mãos de um anãozinho, mas a força<br> de um gigantão. A resposta é sim, eu sei<br> quem sou, eu sei pra onde ir, eu vou te<br> ver, quando o dia surgir, eu sei quem<br> sou, eu tenho pra onde ir, eu vou te ver<br> Bom dia!<br><br>',

                      '5': 'Bom dia, bom dia, Dia bom, bom dia'
                    }
                  },
                  {
                    'id': 2,
                    'slug': 'come-again',
                    'nome': 'Come Again',
                    'autor': 'John Downloand',
                    'video': 'kT3xzcnp9IQ',
                    'estrofes': 4,
                    'letra': {
                      '1': 'Come again: Sweet love doth now invite<br> Thy graces that refrain. To do me due delight<br> To see, to hear, to touch, to kiss, to die,<br> With thee again in sweetest sympathy.<br><br>',

                      '2': 'Come again That I may cease to mourn,<br> Through thy unkind disdain: For now left and forlorn<br> I sit, I sigh, I weep, I faint, I die,<br> In deadly pain and endless misery.<br><br>',

                      '3': 'All the day The sun that lends me shine,<br> By frowns do cause me pine, And feeds me with delay,<br> Her smiles my springs, that makes my joys to grow.<br> Her frowns the Winters of my woe:<br><br>',

                      '4': 'All the night My sleeps are full of dreams,<br> My eyes are full of steams. My heart takes no delight.<br> To see the fruits and joys that some do find.<br> And mark the storms are me assign\'d<br><br>'
                    }
                  },
                  {
                    'id': 3,
                    'slug': 'acalanto',
                    'nome': 'Acalanto',
                    'autor': 'Roberto Carlos',
                    'video': 'vpXbysPh_XI',
                    'estrofes': 3,
                    'letra': {
                      '1': 'É tão tarde, a manhã já vem<br> Todos dormem, a noite também<br> Só eu velo por você, meu bem<br> Dorme anjo, o boi pega neném<br> Lá no céu deixam de cantar<br> Os anjinhos foram se deitar<br> Mamãezinha precisa descansar<br> Dorme anjo, papai vai lhe ninar<br><br>',

                        '2': 'Boi, boi, boi<br> Boi da cara preta<br> Pega essa menina<br> Que tem medo de careta<br><br>',

                        '3': 'Boi, boi, boi<br> Boi da cara preta<br> Pega essa menina<br> Que tem medo de careta<br><br>'
                    }
                  },
                  {
                    'id': 4,
                    'slug': 'a-saudade-mata-a-gente',
                    'nome': 'A Saudade Mata a Gente',
                    'autor': 'Braguinha',
                    'video': 'HIHbeFB-_Xk',
                    'estrofes': 3,
                    'letra': {
                      '1': 'Fiz meu rancho na beira do rio<br> Meu amor foi comigo morar<br> E nas redes nas noites de frio<br> Meu bem me abraçava pra me agasalhar<br><br>',

                      '2': 'Mas agora meu meu bem foi-se embora<br> Foi-se embora e não sei se vai voltar<br> A saudade nas noites de frio<br> Em meu peito vazio virá se aninhar<br><br>',

                      '3': 'A saudade mata a gente, morena<br> A saudade é dor pungente, morena<br> A saudade mata a gente, morena<br> A saudade é dor pungente, morena<br><br>'
                    }
                  },
                  {
                    'id': 5,
                    'slug': 'mamae-oxum',
                    'nome': 'Mamãe Oxum',
                    'autor': 'Zeca Baleiro',
                    'video': '6GX8eaAPang',
                    'estrofes': 1,
                    'letra': {
                      '1': 'Eu vi mamãe oxum na cachoeira<br> Sentada na beira do rio<br> Colhendo lírio lirulê<br> Colhendo lírio lirulá<br> Colhendo lírio pra enfeitar o seu congá<br><br>'
                    }
                  },
                  {
                    'id': 6,
                    'slug': 'suite-do-pescador',
                    'nome': 'Suíte do Pescador',
                    'autor': 'Dorival Caymmi',
                    'video': '3zd0MJrSQxQ',
                    'estrofes': 2,
                    'letra': {
                      '1': 'Minha jangada vai sair pro mar<br> Vou trabalhar, meu bem querer<br> Se Deus quiser quando eu voltar do mar<br> Um peixe bom eu vou trazer<br><br>',

                      '2': 'Meus companheiros também vão voltar<br> E a Deus do céu vamos agradecer<br><br>',

                      '3': 'Adeus, adeus<br> Pescador não se esqueça de mim<br> Vou rezar pra ter bom tempo, meu bem<br> Pra não ter tempo ruim<br> Vou fazer sua caminha macia<br> Perfumada com alecrim<br><br>'
                    }
                  }
                ],

       getMusics : function(){
           return service.musics;
       },

       getMusic : function(slug){
          for (var i in service.musics) {
            var music = service.musics[i];

            if (music.slug == slug) {
              service.music = music;
              rootScope.$broadcast( 'music.view' );
              safeDigest(rootScope);
            }
          }
       }
    };

    return service;

}]);
