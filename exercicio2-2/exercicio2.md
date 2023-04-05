# UNIVERSIDADE FEDERAL DE RORAIMA

## CENTRO DE CIÊNCIA E TECNOLOGIA - CCT

## DEPARTAMENTO DE CIÊNCIA DA COMPUTAÇÃO – DCC

## DCC603 – BANCO DE DADOS II

## PROF. MSC. ACAUAN C. RIBEIRO

---

## Nome(s): Guilherme Lucas Pereira Bernardo 	Nota:\_\_\_\_\_\_\_\_

---
## EXERCÍCIO SQL

### IMPORT E FUNCTIONS

Acessar: https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/indicadores-educacionais/indicadores-de-qualidade-da-educacao-superior

Importar os dados da tabela CPC 2021 (.ods ou .xls) para dentro do Postgresql e responder as seguintes perguntas usando SQL:

## 1) Quantas universidades federais existem no estado do Paraná?
```
	SELECT COUNT(*) FROM public.resultados WHERE sigla_da_ies = 'UFPR';
```

## 2) Liste os cursos de Ciência da Computação, Sistemas de Informação e Tecnólogo em Des. de Sistemas que existem em RR
```
	SELECT * FROM public.resultados WHERE sigla_da_uf = 'RR' AND area_de_avaliacao IN ('CIÊNCIA DA COMPUTAÇÃO (BACHARELADO)', 'SISTEMAS DE INFORMAÇÃO','TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS');
```
## 3) O curso de Ciência da Computação ficou em qual “ranking” comparado somente com as universidades federais da região norte?
### Décimo quinto segundo a consulta sql:
```
	SELECT sigla_da_ies, conceito_enade_continuo
	FROM public.resultados
	WHERE area_de_avaliacao = 'CIÊNCIA DA COMPUTAÇÃO (BACHARELADO)'
	AND sigla_da_uf IN ('RR', 'AM', 'PA', 'AC', 'TO', 'RO', 'AP')
	ORDER BY conceito_enade_continuo desc;
```
## 4) Crie uma função que recebe o código da área de um curso e traga as estatísticas desse curso. Retornando a nota máxima, mínima e média tendo como referencia para esse calculo o CPC (Contínuo)
### devemos primeiramente executar a função na query tool para ela poder ser criada no banco de dados: 
```
	CREATE OR REPLACE FUNCTION estatisticas_do_curso(codigo_area integer)
	RETURNS TABLE(max_cpc numeric, min_cpc numeric, avg_cpc numeric)
	AS $$
	BEGIN
		RETURN QUERY
		SELECT MAX(cpc_continuo), MIN(cpc_continuo), AVG(cpc_continuo)
		FROM public.resultados
		WHERE codigo_da_area = codigo_area::text;
	END;
	$$ LANGUAGE plpgsql;
```
### feito a função podemos usa-la através de(Onde XXXX pode ser substituído pelo código da area de atuação do curso que se deseja observar):
```
	SELECT * FROM estatisticas_do_curso(XXXX);
```