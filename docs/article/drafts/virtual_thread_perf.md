---
tags:
  - Java
  - Linux
---

# Java21の仮想スレッドを触ってみる

Java21で追加された仮想スレッド機能の使ってみて、既存のThreadとの違いを検証します。
20までのJavaではThreadクラスはOSのスレッドの薄いラッパーとなっており1:1でしたが、仮想スレッドによりM:Nとなりコンテキストスイッチのコストが低いのが利点です。
余力があればソースコードも追います。

1. 単純な無限ループ（スイッチできないのでスループット変わらないはず
2. sleep（スイッチできるのでスループット変わるはず。ただ、Thread.sleepのソースコードを見るとvirtで分岐しているのでそもそも比較できないかも）
3. IO(スイッチできるのでスループット変わるはず。)

## pthread

https://gist.github.com/matsukaz/806a006f60a3cbde255dbb6e651f3555#%E5%8F%82%E8%80%83%E8%B3%87%E6%96%99

my ubuntuだと/proc/sys/vm/max_map_countが1<<16で、pthreadを1<<15以上生成しようとするとエラーがでる。-> PlatformThreadの上限のひとつが1<<15

   * /proc/sys/kernel/threads-max
   *
   * <p>/proc/sys/kernel/pid_max
   *
   * <p>/proc/sys/vm/max_map_countの半分

## Threadクラスのソースコードリーディング

Thread()
- newしただけではスレッドは生成されず、startして初めてOSスレッドが生成される。

threadpool
- スレッドの配列を確保しておき、invokeするときにはロックを確認して空いてるThreadを割り当てるだけ
- newThreadPoolとしてもOSのスレッドが確保されるわけではない

Thread.sleep
- thread->parkしている
- OSスレッドをJVM側から制御するためにmutexでロックをとっている


https://linuxjm.osdn.jp/html/LDP_man-pages/man3/pthread_create.3.html



EAGAIN
システムで設定されたスレッド数の上限に達していた。 このエラーの原因となる上限値はいくつかある。 実ユーザー ID 当たりのプロセス数とスレッド数の上限である、ソフトリソース上限 RLIMIT_NPROC に達していた (setrlimit(2) で設定できる)。 カーネルのシステム全体のプロセスとスレッドの数の上限値である /proc/sys/kernel/threads-max が達していた (proc(5) 参照)。 PID の最大値 /proc/sys/kernel/pid_max に達していた (proc(5) 参照)。