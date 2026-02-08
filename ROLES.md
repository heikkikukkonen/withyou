# Roolit ja rakenne

## Yleiskuvaus
Sovelluksen idea on poistaa neuleiden suunnitteluun liittyvä vaikeus: suunnittelija tekee useita standardikokoisia versioita ja neuloja tulkitsee monimutkaisia ohjeita tai räätäläi ne itse. With You tekee räätäläinnistä helppoa: neuloja antaa mitat ja käsialan, ja palvelu muuntaa perusohjeen henkiläkohtaiseksi.

## Tuotemoduulit
- MVP: Räätäläintiwizard, perusohjeen tuonti, käyttäjäprofiili, laskentamoottori, henkiläkohtainen ohjeen renderöinti.
- Myöhemmin: Suunnittelijoiden hallintatyökalut, sisältösivusto, verkkokauppa ja maksullinen käyttöoikeus (kk-maksu + ohjeiden myynti/provisio).

## Rooli 1: Neulesuunnittelija
- Tavoite: Voi tuoda neuleohjeen palveluun helposti ja saada sen räätäläitäväksi.
- Käyttäpolku: Suunnittelu tehdään muualla, tiedot syätetään palveluun, ja neulojien on helppo käyttää ohjetta.
- Päätoiminnot: Tilin luominen, ohjeen tietojen lataus, ohjeen kuvaus ja kuvat.
- Kriittiset tiedot: Ohjeen rakenne ja parametrit muodossa, josta räätäläinti voidaan laskea.
- Rajaukset: Ei alkuvaiheessa suunnittelutyäkaluja eikä maksutoimintoja.

## Rooli 2: Neuloja
- Tavoite: Haluaa räätäläidyn neuleohjeen, joka on helppo seurata neuloessa.
- Käyttäpolku: Valitsee ohjeen tai syättää ohjeen tiedot, tekee mallitilkun, syättää mitat vaiheittaisen ohjatun käyttäliittymän kautta, saa henkiläkohtaisen ohjeen (esim. "Ohjeen nimi with Heikki").
- Päätoiminnot: Tilin luominen, ohjeen valinta/tuonti, mittojen syättä, räätäläidyn ohjeen tarkastelu, ohjeen seuraaminen neuloessa, palautteen ja kuvien jakaminen.
- Kriittiset tiedot: Oikein kerätyt mitat ja käsiala, sekä ohjeen data räätäläintilaskentaa varten.
- Rajaukset: Ei alkuvaiheessa maksutoimintoja. Ei vielä automaattista ohjeiden validointia tai virheiden korjausta.

## Ohjeen seuraaminen (neulojalle)
- MVP: Ohjeen vaiheistus selkeänä tekstinä, seuraava vaihe yhdellä klikkauksella.
- Myöhemmin: äänikomento ja automaattinen ohjeen ääneenluku, jotta neuloja voi edetä kädet vapaana.
