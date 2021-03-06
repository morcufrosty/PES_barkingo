# Barkingo

## Resum
Aplicació que facilita la gestió de mascotes que ja avui en dia n’hi ha moltes que no tenen llar però en podrien tenir. Quan una persona o organització vol buscar una nova casa a una mascota, publica una oferta dins de l’aplicació. D’altra banda, quan una persona vol adoptar una mascota, entra dins de l’aplicació i pot triar quines mascotes li agraden mitjançant un mecanisme de swipe. Un cop s’ha fet swipe, les ofertes es mostren a la pestanya de preferits des d’on es pot obrir un xat per a poder parlar amb el propietari. Quan es posen d’acord, el propietari accepta la oferta i l’animal ja no apareix per la resta d’usuaris. 
## Funcionalitats
- Creació, esborrat i edició d’ofertes
- Mecànica swipe amb like/dislike
- Xat
- Creació, edició i esborrat d’usuaris i perfils
- Aplicació multiplataforma (Android i IOS)
- Multiidioma
- Filtres de les ofertes:
- Filtre per localització (Integració de geolocalització)
- Filtre per raça (amb autocomplete), edat, sexe i tipus d’oferta
- Login amb plataformes externes (google, facebook)
- Possibilitat de reportar ofertes fraudulentes
- WebApp que permet esborrar usuaris conflictius del sistema i ofertes inadequades
- Caché d’imatges al client-side per augmentar la rapidesa
- Creació d’una API REST documentada
- Formularis a stakeholders per obtenir feedback sobre la aplicació
## Membres

| Nom                | Adreça de correu electrònic        |
| ------------------ | ---------------------------------- |
| Arnau Buch         | arnau.buch@est.fib.upc.edu         |
| Soulaiman el Hamri | soulaiman.el.hamri@est.fib.upc.edu |
| Marc Garcia-Penche | marc.garcia-penche@est.fib.upc.edu |
| Pau Mateu          | pau.mateu.jordi@est.fib.upc.edu    |
| Jaume Puig         | jaume.puig.turon@est.fib.upc.edu   |
| Max Ros            | max.ros@est.fib.upc.edu            |
| Eduard Salagran    | eduard.salagran@est.fib.upc.edu    |

## Estructura

A la carpeta app s'hi troba l'aplicació multiplataforma, a la carpeta server s'hi troba el servidor que interactua amb l'aplicació i la base de dades.


## Build de la app:

https://expo.io/artifacts/4484dc8b-8a0e-4360-a709-ea7b245ed025

## Screenshots de la app:

![Swipe](https://lh3.googleusercontent.com/A2ccBUU1pu2FXeYy4WEN-k0kI45lYCRxOjUl6iEV45ZEQPI0CVrHCKV55aTjYvRyk6Nfgrif7Jh-LZPQxrSMYYhGML5dNLmZmeoNN10F9lFTMe7IhO85IJBX0oq7gos-M3i5-0E_8sE9g900JQky7NblF-og9VdnkqeNctsJD-HU-CkbSmR4brZdrjgvhngKMvYgRzRKCsbnOZDeT3w7PCWY03cYTlYf_0C5C5jGVKP3bWhZvG7RZNMCZaOXGQlYSELlDm4vKcA63j6B_X5VoUFjs-g9XNOrJ6SnO1_kjhEWNyIaNR_KEHdyyKCaqK6qaAn65rxMt1ffxS8OtdL8pZH6gVjVo5z1zKuZhY6XK2h0S0_3uo2cuBvRKvkJ2RxpcluPS7ShRqU_NrdLOtT9zse8CPRxhyYx_D7wzsE8uOrQsqV2hqpHWGXuvogpZ5-XJyWloKGx6d-SiXLenIVBjlYYyVNM8BmKCxBRMxmcFNS-MuwK5bSyfw00Xgy75cWKk0an44gPswiYi5gA1mAMcJrBQuFTEPsSQD03Ytq07NgINGXKPldGCwlIS2YlYxqomKJYPwvEBKHu3KrBnKLWV8nV4KjYXnrAjLX8zPXA1ABw4mCXoeTDmLd_ll2kHpbshGwf28N04spGPy1Wu6EK5Mb4IHi43j2W=w448-h969-no)

![New Offer](https://lh3.googleusercontent.com/1Xd1fVXlNqQrPNssb977fv3t2NmW_ckahThYLSPaNuCYjYx4t-x3_aBSvdF8ckMmvxfNnQTZmK_KY_tzyUc66BloCTWZ3X9CVwmxsNY4pG03OAfn-ONWkxApFg0SnjKEEAYlIWZCKb-dufpEzJ_e1wRuJN19I2jpo7_OZE6ahmgFOy5zGexKv3unUrkLiHDmyXSDapr9hMqAqFNhUlZjuDy8UpgFAM1dY-ueNIYFDJHT-TFJ6k9sakv3NzPlZHmbEgI5zNCYLs7STdskFzoV9rKcWaId92IX5N-HUVLhM7_ehzcRr1wkC-LHXCvFv3YVjrrJLBdNdvC_RG2TgayWJjGx2VxKplaH87QFTxMfe8y8TZ_hzrn6asyB3dYGYMgtPJLL29Rk1R0r5FhEYgb_srKHEOxCTPHAXyAFkq1zWqjg2o3vFuobtXGLbNZpgFNJ7BZBUA50I0cxXsmqpMgG5yYcwjZhry9IzT1mT4LrvEV6qC4vdsYBo240jojVTfn4pPSh15yXqFANTlbi0CBqjX44YOTUlAfXLo5APuZ2kQuS_iZcePkDZFHlKvIYQqVaI7Xma1bmNTe-O4PDr6S2EWNLtggjI2c6cjpJR2-kw0O-Y4SvKxOkeJ8AC05TmhWr1dhTHWd1W2SkTp0pwn6D06G6Z4zuYc5N=w448-h969-no)

![Favorited](https://lh3.googleusercontent.com/QEPQHW2sBBfGFOkizNGb-3zYplAQoubBL65Rrwx1oj-iF4cW4R0BPB8QqupffKG8cNEwujIDRwUu-5j0QCKA5dxi3iWYrnvPEnoNndHlCqGYe-AEC8Mso254MgeBTWAWYqyMAA5mTyLS7e9gcp1pzUHpn-AR223hXuXIYQsKCH5NGRtf-W_csKY17nnnnFthA4HNUTNCFTeR04gUQBiCN413BcaoAipQoJZ2kgRAFHU3PTx9Cb8IancU7ug_b-Wutv8q_rqQYqR4e0EGP75I81SQHQHVAC1dfXSsjrmlH-ZV3yIw5TVrxX1yL5IxoGTo7U8uX-kSzHubQL-4Svgyj9saAFBtHVQM1eUcGVAML6wLyLARJN4horI5lRAQ3_xhF7Tm0Et4ohQ1J1rg7Q1P1r9Hihfm8spatxXBecjR6SZXhWMs_kJWFVrRpf8FWYB4GssLPLj54IJqwzo1Fx5Is8acAizyPFx9LwFZM5_JwVVqDmtS5sJtr3Nu2f2297xxXHC8yFhwzVeX40Gd2gZG-MrmWuH4C5PAL5AkXP1-K80ZNJ9XWXszMy8JpgqvhFUFKmoeU3XeCIsJlBpEcRmaDIjnvII47RihNnxIaDGwJ8r9nKdZ3luf9ORHFLG2jPDoYSLbgjHk_unBNHFqSMpum_reUEOsWfsh=w448-h969-no)

![Profile](https://lh3.googleusercontent.com/wJqSfCdNVMNUU_R1sMgC6uTTKqBfg7s8Hp4F8-SeTlOul7Kf_viXsjA3YqGOwxjbG87nqyT8ss3aC1_S41DRQy_QS46cL43wYxP6WFqENegszfkDpQQ89lyWG4VTkPO8C73RjWL5XhTWRd1ZJy3cyBFzYo8HbXxBYEq307F5TJCo9yk36Gp1vvDNx0oTk5XCSNhMBAh7S0VgjfduoNYA9BB_IqpbntdDNvKON5H0Jq47H3GPjVPF22pbK81F5hRRXGdtwc3pnklyI2gKMoY3LRdFjDhO-sDahQpJQXjvA68q7RewlgE3A8B2B3DaNANNyj0SyNR-e5zB85cgLvEJ2ZVqqKplWTyOVhDiZjAVupRCIhXCiR23EyssQcznOiuIQoQA9dkmFzq4Mv864XgBKKoYruCuzy80u9_e3g3cSFkC8eCMiwccF3roVQrarfBOg2rhrNuit3NK3Y-ECN3xeKcQcdBGvZoSe8LHmGm3VTCRN-xXKbNjcughZofOaD-WF98GZ2wvB9W9CCH9u5EYhaSHNNOyjh9la8VNEUF_wh28x6i-MaOvWMvV4dLig4D2e5skEBDkxnPceha8m-sEjXTQTAmmLtWOdKX3DnH1u0Lqk4V7K1zRqgGkSX5bTZ0RwrkJxaxx7Z0xLt-GLfU6XNjAn9roQWQn=w448-h969-no)

![Filters](https://lh3.googleusercontent.com/LtkqQ4H2UgqeQ4p2ntmYaer2EyVhZv3FTpT00NGQu32wQ-dwruNpflZ8TsppoEkgPijsqiiEjzJcPl5I020mO8QOpcu2bkPUYncj2W0weaUEKwCUEc92xqZocL6CfP3NQ-GgsJptXEjcLoe4I55i66VQ0tpNPrnOoDAm3UId5SaiMi5nzA8vSnLZDLtibPxLDIzFBgrQQB2Gqaa1-s5dxbYmG_YeeXTVx_pOBjVqspar5sd3VN-YijN6g21i1g2vVIX0Bfa1TydhCPmjhRlKhHRfPEhbXRSw0O022f3u2xuq0P9ix8YgVaWf4dBum7T7WeECklBc-jmBmpuSyFEV3covojWNvY36HDARWW4fv0SolYtYzNw29LmJRDsxe6ISuQUzd9C1_GY_meGorCZj71EavpiBxEKnPKLNzEBMl-YO-S55ViM7Uo8eoN4SqOcYl_lm8Qumwefuhmc8hVRyYalysAfzTtRf2w_0NvU1hKjaXHbkbnVOXL1cbuJdrF9lLQ-zmyt6YtRS8E6Qc5jzu6Z-UrFt85EELIAbsE8wCvlf-coA2FRIlg7XtGnr60G748gweyGyL3TZJPME0RHRLdEOot7mOD9vVyR1wafl4DgnE_tLLX-Esl0Yd6JIyeZwqZ-LS1oW8X7vS2xkJ5--_OedmMlJDT6c=w448-h969-no)


![Chat](https://lh3.googleusercontent.com/Kfs4yP8Kk26uo9cmDIYG_NSi5_zHTlqmgycvr-E1Cj0TBgNpkypxx3WlMnIhFvGsZxuSPge8G_2f4gsqR8LqVO5n1JOjfaS96P59zuz1OKddOS64ns6LQH1fOvrUboNbP57clQI_72Q7VQ71wQ-_B9mpVYgyI_pNKieF8xtFXUI80NZ-Wa32TtPVrLfqLabA3McNq8P_om7C1NFEJIMsLKr8xAAvl7vpSzUfABxGlLcXKjQYHboDOy07Cll4M2znKnlFmSsmvlYffH6AHoXV1tKC_t1PzWNQ3sNgNH2zAhbSIuoG4wNl1VAKakhBKBVZ1qRAMT_6uLEnXoUyBlA3-IjLaeAV1RChb7wrT0whrtNPHNbPCKEWWzqRgbriIBK5hE6X3c_O6PTYOo6KvBaDWdAcV8w313icRmXLm4XEqiaR-W6yM5Y-zcgcdJkvfUa5D9sEoAOjrH-BU-6bitySgEp29OzrgcedIOzP337G9m2Xr_xohuK8uKVwkHqHnu_DX8DqvheBtTSu3oIAbhvp6IBGBDetFf-9lAeXjyBWfN8tRB2WhduxMskdhL4xZ7ZYNNYNO7LDNyq_ZenMkrZosJrx7E0Srley1XgedwJk8oNi9aq_r-Mh41jSNCYAcHpEu1K4ktKvCELR4-Am-SKloe5fAdzY8J6c=w448-h969-no)
