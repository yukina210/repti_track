# syntax = docker/dockerfile:1

# Rubyのバージョンを指定
ARG RUBY_VERSION=3.1.4

# Rubyの公式イメージを使用
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base
WORKDIR /rails

# 必要なパッケージのインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential libpq-dev postgresql-client curl gnupg2 && \
    # Node.jsとYarnのインストールに必要なリポジトリの追加
    curl -sL https://deb.nodesource.com/setup_21.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    # Node.jsとYarnのインストール
    apt-get install -y nodejs yarn && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Gemのインストール
COPY Gemfile Gemfile.lock ./
RUN bundle install

# アプリケーションコードのコピー
COPY . .

# 環境変数
ENV RAILS_ENV=development

# 非rootユーザーの作成
RUN useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails /rails
USER rails

# ポート3000を開放
EXPOSE 3000

# Railsサーバーを起動
CMD ["rails", "server", "-b", "0.0.0.0"]
